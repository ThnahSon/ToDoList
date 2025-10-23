import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTION_STRING,
        );
        console.log('Kết nối đến cơ sở dữ liệu thành công');

    } catch (error) {
        console.error('Lỗi kết nối đến cơ sở dữ liệu:', error);
        process.exit(1); 

    }
};
  