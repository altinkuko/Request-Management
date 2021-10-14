import {_Resource} from "./resource";

export interface _Request {
  id: number;

  startDate: Date;

  endDate: Date;

  description: string;

  notes: string;

  status: string;

  areaOfInterest: string;

  createdBy: String;

  createdOn: Date;

  modifiedBy: String;

  modifiedOn: Date;

  resourceDTOS: _Resource[];
}
