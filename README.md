# Angular Base

Boilerplate project that contains several functionalities already set-up like:

- **Angular Material**: Angular Material set up with the dashboard schematics;
- **Runtime Configuration via JSON File**: The configurations were loaded on a ```settings.json``` file that is used to feed the angular environment. ;
- **Multi-language**: Multi-language settings using ```ngx-translate```;
- **Masking**: Masking of inputs or texts via ```ngx-mask```;
- **Publish/Subscriber Strategy**: There is a service called ```PubSubService``` that uses the Publish/Subscriber design pattern through ```rxjs``` to make easier the communication across multiple components;
- **Contextual Environment**: Sometimes it's necessary to style something based on the environment in which the application is running. Like, having a different collor in iPhones or Android. Or even show a banner on IE (It's dead, but it stills around like a zombie). In order to have this set easier there are some css-classes that were added to the body (eg.: ```is-chrome```, ```is-safari```, ```is-ie``` and others) based on the environment. The rules used to accomplish it were defined at ```UserAgentService```;
- **Contextual Size**: In order to make the responsiveness process easier, the same process used for the **Contextual Environment** have been implemented. But, in this case, the classes are: ```is-mobile```, ```is-phone```, ```is-tablet```, ```is-desktop```. The sizes were based on some breakpoints defined at ```ViewStateService```;
- **Feature Flags**: Feature Flags structure definition via ```settings.json``` file.

# Documentation Index

- [Development Setup](./docs/setup.md)
- [How to Run the App](./docs/how-to-run.md)

# Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
