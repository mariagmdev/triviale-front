export interface Broma {
  error: boolean;
  category: string;
  type: 'single' | 'twopart';
  setup?: string;
  delivery?: string;
  joke?: string;
  flags: {
    nsfw: boolean;
    religious: boolean;
    political: boolean;
    racist: boolean;
    sexist: boolean;
    explicit: boolean;
  };
  safe: boolean;
  id: number;
  lang: string;
}
