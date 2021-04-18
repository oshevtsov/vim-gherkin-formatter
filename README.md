# Vim Gherkin Formatter

A small CLI to autoformat Gherkin feature files.

## Installing locally

```sh
npm -g install --prefix ~/.local ./
```

or alternatively with `yarn`

```sh
yarn global add --prefix ~/.local ./
```

## How to use

After installation one can simply call it as a CLI script
```sh
vim-gherkin-formatter my_file.feature
```
and it will overwrite the unformatted file with its formatted version.

### Autoformat in Vim/Neovim

Create a file: `~/.config/nvim/after/ftplugin/cucumber.vim` with content
```vim
" Gherkin formatter
command GherkinFormat :silent !vim-gherkin-formatter %

augroup gherkin
  " remove all existing listeners in this group before reattaching them
  autocmd!

  " Disable automatic insertion of comments
  autocmd BufWritePost *.feature execute "GherkinFormat" | edit
augroup END
```

After this, reload Vim/Neovim so that changes are sourced. Autoformat will
be invoked on file save.
