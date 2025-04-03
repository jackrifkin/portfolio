import { ModelSource } from "./types";

export const modelSources: ModelSource[] = [
  {
    name: "right_wall_and_platforms",
    texture: "right_wall_and_platforms_texture.png",
  },
  {
    name: "left_wall",
    texture: "left_wall_texture.png",
  },
  {
    name: "ground",
    texture: "ground_texture2.png",
  },
  {
    name: "cat_speakers_flood_lights",
    texture: "cat_speakers_flood_lights_texture.png",
    hasBloom: true,
    emissiveMap: "cat_speakers_flood_lights_emissiveMap.png",
  },
  {
    name: "floor_wires_metal_tape",
    texture: "floor_wires_metal_tape_texture.png",
    hasBloom: true,
    emissiveMap: "floor_wires_metal_tape_emissiveMap.png",
  },
  {
    name: "wallbricks_tvs_boxes",
    texture: "wall_bricks_tvs_boxes_texture.png",
    hasTransparency: true,
    hasBloom: true,
    emissiveMap: "wallbricks_tvs_boxes_emissiveMap.png",
  },
  {
    name: "sand_rubble",
    texture: "sand_rubble_texture.png",
  },
  {
    name: "experience_flyer",
    texture: "experience_flyer_texture.png",
    isHoverable: true,
  },
  {
    name: "github_flyer",
    texture: "github_flyer_texture.png",
    isHoverable: true,
  },
  {
    name: "linkedin_flyer",
    texture: "linkedin_flyer_texture.png",
    isHoverable: true,
  },
  {
    name: "links_flyer",
    texture: "links_flyer_texture.png",
    isHoverable: true,
  },
  {
    name: "projects_flyer",
    texture: "projects_flyer_texture.png",
    isHoverable: true,
  },
];
