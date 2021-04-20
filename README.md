# Vim Gherkin Formatter

A small CLI to autoformat Gherkin feature files.

## Prerequisites

In order to install and use the formatter, it is required to have NodeJS
runtime environment installed.

## Building the formatter

In order to build the formatter, follow these steps:

1. Clone the repo to your machine
2. Go into the repo directory and execute `npm install`
3. When the previou step finishes, execute `npm run build`
4. Install the formatter locally into the folder which exists in `$PATH`, e.g.
   to install into `~/.local/bin` execute `npm install -g ./ --prefix ~/.local`

The last step will create symbolic links to the artifacts of the build step.

## How to use

After installation one can simply call it as a CLI script

```sh
vim-gherkin-formatter my_file.feature
```

One can even specify a pattern to look for, e.g.

```sh
vim-gherkin-formatter *.feature
```

to format multiple files. This will overwrite the unformatted file(s) with
their formatted version.

### Autoformat in Vim/Neovim

Create a file: `~/.config/nvim/after/ftplugin/cucumber.vim` with content

```vim
" Only do this when not done yet for this buffer
if exists("b:did_ft_cucumber_formatter")
  finish
endif
let b:did_ft_cucumber_formatter = 1

" Gherkin formatter
function s:DoFormatGherkin()
  let l:cur_buffer = bufnr('%')
  if getbufvar(l:cur_buffer, "&mod")
    let l:do_save = confirm("Must save the buffer first.", "&yes\n&no", 1)
    if l:do_save == 1
      write
    else
      return
    endif
  endif
  execute "!vim-gherkin-formatter %" | edit
endfunction

augroup GHERKIN
  " remove all existing listeners in this group before reattaching them
  autocmd!

  " Define commands and mappings local to the Gherkin files
  autocmd BufEnter *.feature command! GherkinFormat :silent call s:DoFormatGherkin()
  autocmd BufLeave *.feature delcommand GherkinFormat

  autocmd BufEnter *.feature nnoremap <buffer> <F4> :GherkinFormat<cr>

  " autocmd BufWritePost *.feature :GherkinFormat<cr>
augroup END
```

After this, reload Vim/Neovim so that changes are sourced. The above defines a
`:GherkinFormat` command and a mapping to it, `<F4>`, which are available only
when editing the `*.feature` Gherkin files.

## Support for empty table cell values

The default implementation of a `TableCell` parser in `gherkin-ast` does not
allow empty table cell values, see line 13 in the file
`./node_modules/gherkin-ast/ast/tableCell.js` and the declaration of a
`TableCell` interface defined in `./node_modules/gherkin-ast/gherkinObject.d.ts`.

One can allow for empty table cell values by modifying the `parse` class method
inside `./node_modules/gherkin-ast/ast/tableCell.js` (lines 12-17) from

```js
    static parse(obj) {
        if (!obj || !obj.value) {
            throw new TypeError("The given object is not a TableCell!");
        }
        return new TableCell(obj.value);
    }
```

to

```js
    static parse(obj) {
        if (!obj) {
            throw new TypeError("The given object is not a TableCell!");
        }
        if (!obj.value) {
            obj.value = "";
        }
        return new TableCell(obj.value);
    }
```

Rerun `npm run build` again and it should work (no need to reinstall the package
since it uses symlinks).
