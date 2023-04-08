import crypto from 'crypto';

const GenerateSecret = () => {
    return crypto.randomBytes(32).toString('hex');
}

export default GenerateSecret