import { Logger } from '@nestjs/common';
import { FilterQuery, Model, UpdateQuery, SaveOptions, Connection } from 'mongoose';
import { AbstractDocument } from './abstract.schema';
export declare abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected readonly model: Model<TDocument>;
    private readonly connection;
    protected abstract readonly logger: Logger;
    constructor(model: Model<TDocument>, connection: Connection);
    create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument>;
    findOne(filterQuery: FilterQuery<TDocument>): Promise<TDocument>;
    findOneAndUpdate(filterQuery: FilterQuery<TDocument>, update: UpdateQuery<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>[] : import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>>;
    upsert(filterQuery: FilterQuery<TDocument>, document: Partial<TDocument>): Promise<TDocument extends any[] ? import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>[] : import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>>;
    find(filterQuery: FilterQuery<TDocument>): Promise<import("mongoose").Default__v<import("mongoose").Require_id<import("mongoose").BufferToBinary<import("mongoose").FlattenMaps<TDocument>>>>[]>;
    startTransaction(): Promise<import("mongodb").ClientSession>;
}
