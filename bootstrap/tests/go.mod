module tests

go 1.14

replace tests.helpers => ./helpers

require (
	cloud.google.com/go v0.70.0
	google.golang.org/genproto v0.0.0-20201022181438-0ff5f38871d5
	tests.helpers v0.0.0-00010101000000-000000000000
)
