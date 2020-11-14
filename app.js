let express = require('express');
let app = express();
app.use(express.json());
app.listen(3000, () => console.log('Server running on port 3000!'))

const {MongoClient} = require('mongodb');

//let MongoClient = require('mongodb').MongoClient;
/*const uri = "mongodb+srv://root:root@cluster0.ibjks.mongodb.net/mydb?retryWrites=true&w=majority";*/

/*var url = "mongodb+srv://root:root@cluster0.ibjks.mongodb.net/mydb?retryWrites=true&w=majority";*/
/*const client = new MongoClient(uri);*/

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

async function createListing(client, newListing){
    const result = await client.db("mydb").collection("books").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);
}




async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb+srv://root:root@cluster0.ibjks.mongodb.net/mydb?retryWrites=true&w=majority";
 

    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
        await createListing(client,
            {
                name: "Lovely Loft",
                summary: "A charming loft in Paris",
                bedrooms: 1,
                bathrooms: 1
            }
        );
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);





app.post('/postForm', (req, res) => {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("books").insertOne({
            title: req.body.title,
            author: req.body.author,
            releaseDate: req.body.releaseDate,
            genre: req.body.releaseDate,
            prixAchat: req.body.prixAchat,
            prixVente: req.body.prixVente,
            nbrStockage: req.body.nbrStockage,
            etat: req.body.etat

        }, 
        function(err, result) {
            if (err) throw err;
            res.json(result);
            db.close();
        });
    });
});
