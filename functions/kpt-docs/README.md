# Kpt docs function

This function is used to generate setter documentation and insert it into Kpt pkg documentation.

## Usage

The fn can be run as an executable or a container.

```sh
go build -o kpt-docs .
kpt fn run testdata/ --enable-exec --exec-path ./kpt-docs -- baseDir="testdata/"
```

HTML comments are used for determining the position to insert into README.md.

A README.md file like

```md
# My Kpt Pkg

Lorem ipsom

## Docs
<!-- BEGINNING OF PRE-COMMIT-KPT DOCS HOOK -->
<!-- END OF PRE-COMMIT-KPT DOCS HOOK -->

## Other
```
will result in the docs being inserted between the comments.

```md
# My Kpt Pkg

Lorem ipsom

## Docs
## Setters
<!-- BEGINNING OF PRE-COMMIT-KPT DOCS HOOK -->
|   NAME    | VALUE  |     SET BY      |     DESCRIPTION      | COUNT | REQUIRED | IS SET |
|-----------|--------|-----------------|----------------------|-------|----------|--------|
| setter-1  | 80     | package-default | setter desc          | 3     | No       | No     |
<!-- END OF PRE-COMMIT-KPT DOCS HOOK -->

## Other
```