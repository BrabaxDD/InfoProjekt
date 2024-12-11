import GameObject from "../GameObject.js";
import ImageLoader from "./ImageLoader.js"

export default class TileMap extends GameObject {
    constructor(scene, tileSize) {
        super(scene);
        this.tileSize = tileSize;
        this.scene = scene;
        this.canvas = this.scene.canvas;
        this.ctx = this.scene.canvas.getContext("2d");

        // Initialize the image loader
        this.imageLoader = new ImageLoader();

        // Define the tile-to-file mapping
        this.tileMap = {
            0: "Wand.png", // Example tiles
            1: "Floor.png",
        };

        // Initialize the map
        this.map = [
            [0, 0],
            [1, 0],
            [1, 1],
        ];
        // Annehmen, wir haben eine Datei "example.txt" im selben Verzeichnis
        this.map = this.loadMap("Map.txt")
        console.log(this.map)
                
                
                
    }

    async loadMap(fileName) {
        let mapData = null;
        try {
            const response = await fetch(`/static/images/${fileName}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            mapData = await response.text(); 
        } catch (error) {
            console.error('Error beim Laden der Datei:', error);
            return null; 
        }
    
        
        mapData = mapData.split("\r");
    
        
        let l = mapData.length;
        let result = [];
    
        for (let i = 0; i < l; i++) {
            
            let row = mapData[i].split(",").map(Number);
            result.push(row);
        }
    
        console.log(this.map = result); 
        return result;
    }
    
    

    process(){

    }

    render() {
        const length = this.map.length;

        for (let row = 0; row < length; row++) {
            const width = this.map[row].length;

            for (let column = 0; column < width; column++) {
                const tile = this.map[row][column];
                const fileName = this.tileMap[tile]; // Get file name based on tile type

                if (fileName) {
                    this.imageLoader.load(
                        fileName,
                        (image) => {
                            // Draw the image once it's loaded
                            this.ctx.drawImage(
                                image,
                                column * this.tileSize,
                                row * this.tileSize,
                                this.tileSize,
                                this.tileSize
                            );
                        },
                        (error) => {
                            console.error(`Error loading tile image: ${fileName}`, error);
                        }
                    );
                }
            }
        }
    }
}