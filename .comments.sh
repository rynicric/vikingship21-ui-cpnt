NAME=vikingship21-ui-cpnt

npx create-react-app $NAME --template typescript  # init
npx -p @storybook/cli sb init  # storybook
npm i --save-dev sass  # sass
npm i --save-dev rimraf  # rimraf
npm i --save-dev eslint  # eslint
npm i --save-dev cross-env  # cross-env
npm i --save-dev husky  # husky (git hooks)
npm i --save-dev @types/classnames  # classnames
npm i --save classnames  # classnames
npm i --save axios  # axios

# for Icon and Transition
npm i --save @fortawesome/fontawesome-svg-core
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/react-fontawesome
npm i --save react-transition-group
npm i --save-dev @types/react-transition-group

# Cleanup
npm uninstall web-vitals
