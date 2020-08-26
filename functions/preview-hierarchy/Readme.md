# Preview Hierarchy generator Kpt function

The purpose of this function is to generate a resource hierarchy from KCC KRMs
passed to it as input. It serves as visual preview SVG that can be reviewed
before actuating resources / folder structures within a GCP org.

Currently, the fn can be run as follows:

```bash
go build -o render-hierarchy .
kpt fn run samples/ --enable-exec --exec-path ./render-hierarchy -- output=test.svg
```