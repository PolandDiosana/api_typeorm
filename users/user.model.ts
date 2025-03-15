import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  email!: string;

  @Column()
  passwordHash!: string;

  @Column()
  title!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  role!: string;
}
