# How to use ui-components

# Add git submodule to your project
```
git submodule add https://akila1001@bitbucket.org/neo_9asset/ui-components.git
```


# Clone your repos included submodules
```
git clone --recursive-submodules < your repos url>
```

# Update submodule for already cloned repos
```
git submodule init
git submodule update
```


# Update ui-component submodule from your project
```
git submodule update --remote --merge
```