#!/bin/sh

cd `dirname $0`
cd ..
sudo chown -R devcontainer ~

# install go development kit
go install golang.org/x/tools/cmd/guru@latest
go install golang.org/x/tools/cmd/gorename@latest
go install golang.org/x/tools/gopls@latest
go install golang.org/x/tools/cmd/godoc@latest
go install golang.org/x/lint/golint@latest
go install golang.org/x/tools/cmd/goimports@latest
go install github.com/rogpeppe/godef@latest
go install github.com/rakyll/statik@latest
go install github.com/gobuffalo/packr/packr@latest
go install golang.org/x/vuln/cmd/govulncheck@latest
go install github.com/go-delve/delve/cmd/dlv@master
go install github.com/haya14busa/goplay/cmd/goplay@v1.0.0
go install github.com/fatih/gomodifytags@v1.16.0
go install github.com/josharian/impl@latest
go install github.com/cweill/gotests/gotests@latest
go install github.com/ramya-rao-a/go-outline@latest
go install github.com/mdempsky/gocode@latest
go install github.com/k0kubun/pp@latest
go install honnef.co/go/tools/cmd/staticcheck@latest
