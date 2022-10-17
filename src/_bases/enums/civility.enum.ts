import { registerEnumType } from "@nestjs/graphql";

export enum Civility {
    MONSIEUR,
    MADAME,
}

registerEnumType(Civility, {
    name: 'Civility',
    description: 'Define a person civility.',
});