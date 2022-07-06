import { CharacterLocation } from './character-location';
import { CharacterOrigin } from './character-origin';

export interface CharacterResults {
  created: string;
  episode: string[];
  gender: string;
  id: string;
  image: string;
  location: CharacterLocation;
  name: string;
  origin: CharacterOrigin;
  species: string;
  status: string;
  type: string;
  url: string;
}
