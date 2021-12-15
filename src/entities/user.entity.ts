import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {Role} from "./role.entity";
import {Link} from "./link.entity";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    name: string;

    @Column({nullable: false, unique: true})
    email: string;

    @Column({nullable: false})
    password: string;

    @CreateDateColumn({ name: 'created_date', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    created_date: Date;

    @UpdateDateColumn({ name: 'updated_date', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updated_date: Date;

    @ManyToMany(() => Role)
    @JoinTable({
        name: "user_role",
        joinColumn: {name: 'user_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'role_id', referencedColumnName: 'id'}
    })
    roles: Role[]

    @OneToMany(() => Link, link => link.created_by)
    links: Link[];

}