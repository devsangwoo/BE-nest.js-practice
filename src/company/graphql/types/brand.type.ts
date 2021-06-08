import { ObjectType, ID, Field } from '@nestjs/graphql';
import { IBrand } from 'src/brand/interfaces/entities/brand-entity.interface';
import { Model } from 'src/model/graphql/types/model.type';

@ObjectType()
export class Brand implements IBrand {
  @Field(_type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(_type => [Model])
  models: Model[];

  @Field()
  visible: boolean;

  @Field({ nullable: true })
  icon: string;
}
