export interface IOrganization {
    logo?: string,
    name?: string,
    projectName?: string,
    allTeamMembers?: string,
    isAdmin?: {id: string, name: string}[],
    email?: string,
    code?: string
}