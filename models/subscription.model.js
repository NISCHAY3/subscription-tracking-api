import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, 'user name is required'],
        trim: true,
        minLength: 2,
        maxLength: 100
    },
    price: {
        type: Number,
        required: [true, 'subscription price is required'],
        minLength: [0, 'price must be greater than 0']
    },

    currency: {
        type: String,
        enum: ['USD', 'EUR', 'GBP', 'INR'],
        default: 'INR',
    },

    frequency: {
        type: String,
        enum: ['daily', 'weekely', 'monthly', 'yearly']
    },

    category: {

        type: String,
        enum: ['entertainment', 'news', 'lifestyle', 'technology', 'sports', 'politics', 'finance', 'other'],
        required: true

    },

    paymentMethod: {

        type: String,
        required: true,
        trim: true

    },
    status: {
        type: String,
        enum: ['active', 'cancelled', 'expired'],
        default: 'active'

    },

    startDate: {

        type: Date,
        required: true,
        validate: {
            validator: (value) => value <= new Date(),
            message: 'Start date must be in the past'
        }

    },
    renewalDate: {

        type: Date,
        validate: {
            validator: function (value) {
                return value > this.startDate
            },
            message: 'renewal date must be after the startdate'
        }

    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true,
    }


}, { timestamps: true });


//auto calculate the renewal date
subscriptionSchema.pre('save', function (next) {
    if (!this.renewalDate) {
        const renewalPeriods = {
            daily: 1,
            weekely: 7,
            monthly: 30,
            yearly: 365
        };

        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + renewalPeriods[this.frequency]);
    }

    if (this.renewalDate < new Date()) {
        this.status = 'expired';
    }

    next();
});

const Subscription = new mongoose.model('Subscription', subscriptionSchema);
export default Subscription;
