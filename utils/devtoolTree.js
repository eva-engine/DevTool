export default class DevtoolTree{
    constructor(){
        this.root = {
            children: [],
            [outliner]:{
                id: 0,
                type: 'root',
                collapsed: false,
                parent: null
            }
        }
        this.nodes = [this.root];
    }
}