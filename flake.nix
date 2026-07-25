{
  description = "Development shell for eslint-plugin-v3xlabs";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = {
    nixpkgs,
    flake-utils,
    ...
  }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = import nixpkgs {inherit system;};
    in {
      devShells.default = pkgs.mkShell {
        buildInputs = [
          pkgs.nodejs_24
          pkgs.pnpm
        ];

        shellHook = ''
          echo "node $(node --version) / pnpm $(pnpm --version)"
        '';
      };
    });
}
