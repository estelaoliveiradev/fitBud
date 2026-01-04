
export interface Workout {
  id: string;
  type: string;
  duration: number; // minutes
  calories: number;
  date: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface UserProgress {
  level: number;
  experience: number;
  streak: number;
  totalWorkouts: number;
  avatarConfig: AvatarConfig;
}

export interface AvatarConfig {
  bodyColor: string;
  accessory: 'none' | 'headband' | 'dumbbells' | 'cape';
  expression: 'happy' | 'determined' | 'exhausted';
}

export interface Friend {
  id: string;
  name: string;
  level: number;
  lastWorkout: string;
  avatarConfig: AvatarConfig;
}
