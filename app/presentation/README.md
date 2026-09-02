# Presentation ownership

Each top-level presentation section owns one directory named for its registry
`id` under `app/presentation/`. Keep section-specific components, data, and
assets inside that directory. Editing an existing section must not require a
change to the registry or route configuration.

The ordered navigation metadata in `registry.ts` is the source of truth for
section IDs, titles, and paths. `app/routes.ts` derives route modules from each
section ID using the `app/presentation/<section-id>/page.tsx` convention. To add
a top-level section, add one registry entry and its conventionally named
directory.

Code shared by multiple sections belongs in `app/presentation/shared/`.
Sections may import shared presentation code, but must not import from another
section. Do not add a global component switch, section barrel, or content
registry.
