import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'media-files' })
export class MediaFile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  filename: string;

  @Column({ nullable: false })
  path: string;

}