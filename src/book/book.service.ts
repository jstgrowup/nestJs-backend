import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}
  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async post(book: Book): Promise<Book> {
    const books = await this.bookModel.create(book);
    return books;
  }
  async findById(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
  async updateById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    // This option specifies that the method should return the modified document rather than the original one. When set to true, it means that the updated document will be returned after the update operation.
    // runValidators: true: This option instructs Mongoose to run the validators defined for the model.
  }
  async deleteById(id: string): Promise<any> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
