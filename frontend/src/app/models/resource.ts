import {_Skill} from "./skill";

export interface _Resource {
  resourceId: Number;

  skillDTOS: _Skill[];

  note: String;

  seniority:String;
}
