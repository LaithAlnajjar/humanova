
export interface PODProfile {
  id: string;
  disabilityType: string;
  needs: string[];
  university: string;
  major: string;
}

export interface VolunteerMatch {
  id: string;
  name: string;
  location: string;
  skills: string[];
}

export interface Rating {
  id:string;
  volunteerId: string;
  rating: number;
  comment: string;
}
