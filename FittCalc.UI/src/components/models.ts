export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface GenderOption {
  label: string;
  value: 'male' | 'female';
}

export interface ActivityOption {
  label: string;
  value: 'sedentary' | 'lightly' | 'moderately' | 'very' | 'extra';
}
