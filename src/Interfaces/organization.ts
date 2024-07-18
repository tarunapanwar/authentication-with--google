export interface IOrganization {
    teamName?: string,
    logo?: string,
    name?: string,
    projectName?: string,
    teamMembers?: {email: string}[],
    isAdmin?: {id: string, name: string}[],
    email?: string,
    code?: string
}