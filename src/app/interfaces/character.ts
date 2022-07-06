import { CharacterInfo } from './character-info';
import { CharacterResults } from './character-results';

export interface Character {
  info: CharacterInfo;
  results: CharacterResults[];
}
