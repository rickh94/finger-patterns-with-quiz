{ pkgs, ... }:

{
  # https://devenv.sh/packages/
  packages = [
    pkgs.git
    pkgs.nodejs
    pkgs.nodePackages.prettier
    pkgs.nodePackages.typescript
    pkgs.nodePackages.typescript-language-server
    pkgs.go
  ];

  languages.javascript.enable = true;
  languages.typescript.enable = true;
  languages.go.enable = true;
  # https://devenv.sh/scripts/

  # https://devenv.sh/languages/
  # languages.nix.enable = true;

  # https://devenv.sh/pre-commit-hooks/
  # pre-commit.hooks.shellcheck.enable = true;

  # https://devenv.sh/processes/
  # processes.ping.exec = "ping example.com";

  # See full reference at https://devenv.sh/reference/options/
  scripts.format.exec = "prettier --write . --plugin=prettier-plugin-tailwindcss --plugin=prettier-plugin-astro";

  processes = {
    astro.exec = "npm run dev";
  };
}
