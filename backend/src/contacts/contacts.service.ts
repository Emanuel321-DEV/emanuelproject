/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './schemas/contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Injectable()
export class ContactsService {
    constructor(
        @InjectModel(Contact.name) private contactModel: Model<ContactDocument>,
    ) {}
    
      async create(createContactDto: CreateContactDto): Promise<Contact> {
        const createdContact = new this.contactModel(createContactDto);
        return createdContact.save();
      }
    
      async findAll(): Promise<Contact[]> {
        return this.contactModel.find().exec();
      }
    
      async findOne(id: string): Promise<Contact> {
        const contact = await this.contactModel.findById(id).exec();
        if (!contact) {
          throw new NotFoundException(`Contato #${id} não encontrado`);
        }
        return contact;
      }
    
      async update(id: string, updateContactDto: UpdateContactDto): Promise<Contact> {
        const updatedContact = await this.contactModel.findByIdAndUpdate(id, updateContactDto, { new: true });
        if (!updatedContact) {
          throw new NotFoundException(`Contato #${id} não encontrado`);
        }
        return updatedContact;
      }
    
      async remove(id: string): Promise<Contact> {
        const deletedContact = await this.contactModel.findByIdAndDelete(id);
        if (!deletedContact) {
          throw new NotFoundException(`Contato #${id} não encontrado`);
        }
        return deletedContact;
      }

}
