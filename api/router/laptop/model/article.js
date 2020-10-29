import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ArticleSchema = new Schema(
    {
        company: { type: Schema.Types.ObjectId, ref: 'LaptopCompany', required: true },
        trademark: { type: Schema.Types.ObjectId, ref: 'LaptopTrademark', required: true },
        product: { type: Schema.Types.ObjectId, ref: 'LaptopProduct', required: true },
        content: { type: String }
    }, 
    { 
        toJSON: { virtuals: true } 
    }
);

const Article = mongoose.model('LaptopArticle', ArticleSchema);

export default Article;
