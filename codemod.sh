# https://github.com/mui-org/material-ui/tree/master/packages/material-ui-codemod
find src \( -name '*.ts' -o -name '*.tsx' \) -print | xargs jscodeshift --verbose=2 --parser=tsx --extensions=ts,tsx -t node_modules/@material-ui/codemod/lib/v4.0.0/top-level-imports.js
find src \( -name '*.ts' -o -name '*.tsx' \) -print | xargs jscodeshift --verbose=2 --parser=tsx --extensions=ts,tsx -t node_modules/@material-ui/codemod/lib/v4.0.0/optimal-imports.js
