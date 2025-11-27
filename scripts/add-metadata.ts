import { readFileSync } from 'node:fs';
import { applicationDefault, cert, initializeApp } from 'firebase-admin/app';
import { getFirestore, type DocumentReference } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { NumberSchema } from 'firebase/ai';


type NamedAPIResource = {
  name: string;
  url: string;
};

type Name = {
  name: string;
  language: NamedAPIResource;
};

//
// ABILITIES
//
type PokemonAbility = {
  is_hidden: boolean;
  slot: number;
  ability: NamedAPIResource;
};

//
// EVOLUTION CHAIN
//
type EvolutionDetail = {
  item: NamedAPIResource | null;
  trigger: NamedAPIResource;
  gender: number | null;
  held_item: NamedAPIResource | null;
  known_move: NamedAPIResource | null;
  known_move_type: NamedAPIResource | null;
  location: NamedAPIResource | null;
  min_level: number | null;
  min_happiness: number | null;
  min_beauty: number | null;
  min_affection: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedAPIResource | null;
  party_type: NamedAPIResource | null;
  relative_phyisical_stats: number | null;
  time_of_day: string;
  trade_species: NamedAPIResource | null;
  turn_upside_down: boolean;
};

type ChainLink = {
  is_baby: boolean;
  species: NamedAPIResource;
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
};

//
// FORMS (INCLUDING MEGAS)
//
type PokemonFormType = {
  slot: number;
  type: NamedAPIResource;
};

type PokemonFormSprites = {
  front_default: string | null;
  front_shiny: string | null;
  back_default: string | null;
  back_shiny: string | null;
};

type PokemonForm = {
  id: number;
  name: string;
  order: number;
  form_order: number;
  is_default: boolean;
  is_battle_only: boolean;
  is_mega: boolean;
  form_name: string;
  pokemon: NamedAPIResource;
  types: PokemonFormType[];
  sprites: PokemonFormSprites;
  version_group: NamedAPIResource;
  names: Name[];
  form_names: Name[];
};

//
// BASE STATS
//
type PokemonStat = {
  base_stat: number;
  effort: number;
  stat: NamedAPIResource;
};

//
// LOCATION ENCOUNTERS
//
type Encounter = {
  min_level: number;
  max_level: number;
  condition_values: NamedAPIResource[];
  chance: number;
  method: NamedAPIResource;
};

type VersionEncounterDetail = {
  version: NamedAPIResource;
  max_chance: number;
  encounter_details: Encounter[];
};

type PokemonLocationArea = {
  location_area: NamedAPIResource;
  version_details: VersionEncounterDetail[];
};

//
// FINAL API RESPONSE TYPE
//
type PokemonApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  description: string;
  abilities: PokemonAbility[];
  evolution_chain: ChainLink;
  forms: PokemonForm[];
  stats: PokemonStat[];
  locations: PokemonLocationArea[];
};
