import {MemberTotal} from "src/models/member.total";

export type LastDaySummary = {
  day: Date;
  membersTotal: Array<MemberTotal>;
};
