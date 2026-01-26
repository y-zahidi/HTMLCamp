<?php
/**
 * Progress Analytics Engine
 * 
 * Calculates comprehensive learning metrics and generates
 * personalized insights for student progress tracking.
 * 
 * Features:
 * - Multi-dimensional progress calculation
 * - Streak tracking and rewards
 * - Technology-specific mastery levels
 * - Comparative analytics
 * - Predictive completion estimation
 */

class ProgressAnalytics {
    private $db;
    private $cache;
    
    public function __construct($database, $cache) {
        $this->db = $database;
        $this->cache = $cache;
    }
    
    /**
     * Get comprehensive user analytics
     * 
     * @param int $userId User ID
     * @return array Complete analytics data
     */
    public function getUserAnalytics($userId) {
        // Check cache first
        $cacheKey = "analytics:user:$userId";
        $cached = $this->cache->get($cacheKey);
        
        if ($cached) {
            return $cached;
        }
        
        // Calculate all metrics
        $analytics = [
            'overview' => $this->getOverview($userId),
            'progress' => $this->getProgressMetrics($userId),
            'activity' => $this->getActivityData($userId),
            'mastery' => $this->getMasteryLevels($userId),
            'insights' => $this->generateInsights($userId),
            'recommendations' => $this->getRecommendations($userId)
        ];
        
        // Cache for 5 minutes
        $this->cache->set($cacheKey, $analytics, 300);
        
        return $analytics;
    }
    
    /**
     * Calculate overall progress overview
     */
    private function getOverview($userId) {
        $stmt = $this->db->prepare("
            SELECT 
                COUNT(DISTINCT up.lesson_id) as lessons_completed,
                COUNT(DISTINCT es.exercise_id) as exercises_solved,
                COALESCE(SUM(es.points_earned), 0) as total_points,
                COALESCE(AVG(es.score), 0) as average_score,
                COUNT(DISTINCT up.course_id) as courses_started
            FROM users u
            LEFT JOIN user_progress up ON u.id = up.user_id AND up.completed = 1
            LEFT JOIN exercise_submissions es ON u.id = es.user_id
            WHERE u.id = ?
        ");
        
        $stmt->execute([$userId]);
        $overview = $stmt->fetch(PDO::FETCH_ASSOC);
        
        // Calculate global rank
        $overview['global_rank'] = $this->calculateGlobalRank($userId);
        
        // Calculate streak
        $overview['current_streak'] = $this->calculateStreak($userId);
        $overview['longest_streak'] = $this->getLongestStreak($userId);
        
        return $overview;
    }
    
    /**
     * Get progress by technology
     */
    private function getProgressMetrics($userId) {
        $stmt = $this->db->prepare("
            SELECT 
                c.technology,
                COUNT(DISTINCT l.id) as total_lessons,
                COUNT(DISTINCT up.lesson_id) as completed_lessons,
                ROUND(COUNT(DISTINCT up.lesson_id) * 100.0 / 
                      COUNT(DISTINCT l.id), 2) as completion_percentage,
                COUNT(DISTINCT e.id) as total_exercises,
                COUNT(DISTINCT es.exercise_id) as completed_exercises,
                COALESCE(AVG(es.score), 0) as average_score
            FROM courses c
            LEFT JOIN lessons l ON c.id = l.course_id
            LEFT JOIN user_progress up ON l.id = up.lesson_id 
                AND up.user_id = ? AND up.completed = 1
            LEFT JOIN exercises e ON l.id = e.lesson_id
            LEFT JOIN exercise_submissions es ON e.id = es.exercise_id 
                AND es.user_id = ?
            WHERE c.is_published = 1
            GROUP BY c.technology
            ORDER BY completion_percentage DESC
        ");
        
        $stmt->execute([$userId, $userId]);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    /**
     * Get activity data for visualization
     */
    private function getActivityData($userId) {
        // Last 28 days of activity
        $stmt = $this->db->prepare("
            SELECT 
                DATE(created_at) as date,
                COUNT(*) as activities,
                COUNT(DISTINCT lesson_id) as lessons,
                COUNT(DISTINCT exercise_id) as exercises
            FROM (
                SELECT created_at, lesson_id, NULL as exercise_id 
                FROM user_progress 
                WHERE user_id = ? AND completed = 1
                UNION ALL
                SELECT submitted_at, NULL, exercise_id 
                FROM exercise_submissions 
                WHERE user_id = ?
            ) activity_log
            WHERE created_at >= DATE_SUB(NOW(), INTERVAL 28 DAY)
            GROUP BY DATE(created_at)
            ORDER BY date DESC
        ");
        
        $stmt->execute([$userId, $userId]);
        $activity = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Fill in missing days with zero activity
        return $this->fillActivityGaps($activity, 28);
    }
    
    /**
     * Calculate mastery levels per technology
     */
    private function getMasteryLevels($userId) {
        $progress = $this->getProgressMetrics($userId);
        
        $mastery = [];
        foreach ($progress as $tech) {
            $level = 'Beginner';
            $percentage = $tech['completion_percentage'];
            
            if ($percentage >= 80 && $tech['average_score'] >= 80) {
                $level = 'Expert';
            } elseif ($percentage >= 50 && $tech['average_score'] >= 70) {
                $level = 'Advanced';
            } elseif ($percentage >= 25 && $tech['average_score'] >= 60) {
                $level = 'Intermediate';
            }
            
            $mastery[$tech['technology']] = [
                'level' => $level,
                'percentage' => $percentage,
                'score' => $tech['average_score']
            ];
        }
        
        return $mastery;
    }
    
    /**
     * Generate personalized insights
     */
    private function generateInsights($userId) {
        $overview = $this->getOverview($userId);
        $progress = $this->getProgressMetrics($userId);
        $activity = $this->getActivityData($userId);
        
        $insights = [];
        
        // Streak insight
        if ($overview['current_streak'] >= 7) {
            $insights[] = [
                'type' => 'achievement',
                'message' => "Amazing! You're on a {$overview['current_streak']}-day streak!",
                'icon' => '🔥'
            ];
        }
        
        // Progress insight
        $totalCompletion = array_sum(array_column($progress, 'completion_percentage')) / count($progress);
        if ($totalCompletion >= 75) {
            $insights[] = [
                'type' => 'success',
                'message' => "You're making excellent progress! {$totalCompletion}% overall completion.",
                'icon' => '🎯'
            ];
        }
        
        // Activity insight
        $recentActivity = array_sum(array_column(array_slice($activity, 0, 7), 'activities'));
        if ($recentActivity > 20) {
            $insights[] = [
                'type' => 'motivation',
                'message' => "Very active this week! {$recentActivity} learning activities completed.",
                'icon' => '⚡'
            ];
        }
        
        // Identify strongest technology
        $strongest = array_reduce($progress, function($carry, $item) {
            return (!$carry || $item['completion_percentage'] > $carry['completion_percentage']) 
                ? $item : $carry;
        });
        
        if ($strongest['completion_percentage'] > 50) {
            $insights[] = [
                'type' => 'strength',
                'message' => "You're excelling in {$strongest['technology']}!",
                'icon' => '💪'
            ];
        }
        
        return $insights;
    }
    
    /**
     * Get personalized recommendations
     */
    private function getRecommendations($userId) {
        $progress = $this->getProgressMetrics($userId);
        $recommendations = [];
        
        // Find technologies with low progress
        foreach ($progress as $tech) {
            if ($tech['completion_percentage'] < 25) {
                $recommendations[] = [
                    'type' => 'suggestion',
                    'technology' => $tech['technology'],
                    'message' => "Start your {$tech['technology']} journey - only {$tech['completed_lessons']} lessons completed",
                    'action_url' => "/cours?tech={$tech['technology']}"
                ];
            }
        }
        
        // Find almost completed technologies
        foreach ($progress as $tech) {
            if ($tech['completion_percentage'] >= 75 && $tech['completion_percentage'] < 100) {
                $recommendations[] = [
                    'type' => 'complete',
                    'technology' => $tech['technology'],
                    'message' => "You're almost there! Only " . 
                        ($tech['total_lessons'] - $tech['completed_lessons']) . 
                        " lessons left in {$tech['technology']}",
                    'action_url' => "/cours?tech={$tech['technology']}"
                ];
            }
        }
        
        return $recommendations;
    }
    
    /**
     * Calculate current learning streak
     */
    private function calculateStreak($userId) {
        $stmt = $this->db->prepare("
            SELECT DATE(created_at) as activity_date
            FROM (
                SELECT created_at FROM user_progress 
                WHERE user_id = ? AND completed = 1
                UNION
                SELECT submitted_at FROM exercise_submissions 
                WHERE user_id = ?
            ) activities
            ORDER BY activity_date DESC
        ");
        
        $stmt->execute([$userId, $userId]);
        $dates = $stmt->fetchAll(PDO::FETCH_COLUMN);
        
        if (empty($dates)) {
            return 0;
        }
        
        $streak = 1;
        $today = new DateTime();
        $lastDate = new DateTime($dates[0]);
        
        // Check if last activity was today or yesterday
        $daysDiff = $today->diff($lastDate)->days;
        if ($daysDiff > 1) {
            return 0; // Streak broken
        }
        
        // Count consecutive days
        for ($i = 1; $i < count($dates); $i++) {
            $currentDate = new DateTime($dates[$i]);
            $prevDate = new DateTime($dates[$i-1]);
            
            $diff = $prevDate->diff($currentDate)->days;
            
            if ($diff === 1) {
                $streak++;
            } else {
                break;
            }
        }
        
        return $streak;
    }
    
    /**
     * Calculate global rank among all users
     */
    private function calculateGlobalRank($userId) {
        $stmt = $this->db->prepare("
            SELECT COUNT(*) + 1 as rank
            FROM leaderboard
            WHERE total_points > (
                SELECT total_points 
                FROM leaderboard 
                WHERE user_id = ?
            )
        ");
        
        $stmt->execute([$userId]);
        return (int)$stmt->fetchColumn();
    }
    
    /**
     * Fill missing days in activity data
     */
    private function fillActivityGaps($activity, $days) {
        $filled = [];
        $activityMap = [];
        
        // Create map of existing data
        foreach ($activity as $day) {
            $activityMap[$day['date']] = $day;
        }
        
        // Fill all days
        for ($i = 0; $i < $days; $i++) {
            $date = date('Y-m-d', strtotime("-$i days"));
            $filled[] = $activityMap[$date] ?? [
                'date' => $date,
                'activities' => 0,
                'lessons' => 0,
                'exercises' => 0
            ];
        }
        
        return array_reverse($filled);
    }
}
