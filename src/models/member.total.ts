import {WorkspaceMember} from "src/models/workspace.member";

export class MemberTotal {

  constructor(public member: WorkspaceMember,
              public readonly hasTimeEntries: boolean) {}

}
