# GTI525 EQUIPE 10

## Notes
git pull
npm install
npm run serve

passing properties to component
-add to componenet's attribtues under template of App.vue
-add in componenet's script export

bind Object in template of App.vue
- data(){reutrn... newObject:{...}}
-:newProp="newProp" //add to template
-double curly brackets to retrieve value in component

computed section: {
    //object can have different values ST vue will re-render if there are changes to said object
}

mounted:{
    await this.functionOnLoad() //methods on load
}

methods: {
    asyn functionOnLoad()
    //only read on load and on read
}

v-if/v-else/vi-else-if
-everycomponent has this ST will display or not depending on v-if value 

Reverse communication
- Component has button with @$emit('ACTION')
- Parent has @ACTION="actionInParent"

style scoped --> only for this component and it's children