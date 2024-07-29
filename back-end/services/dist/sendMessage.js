"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const sendMessage = (phone, messageType, content) => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.WHATSAPP_ACCESS_TOKEN;
    const phoneNumberId = process.env.WHATSAPP_BUSINESS_ACCOUNT_ID;
    if (!phoneNumberId) {
        throw new Error('WHATSAPP_BUSINESS_ACCOUNT_ID não está definido.');
    }
    const url = `https://graph.facebook.com/v20.0/${phoneNumberId}/messages`;
    const payload = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: phone,
        type: messageType,
        [messageType]: content
    };
    try {
        const response = yield axios_1.default.post(url, payload, {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log('Mensagem enviada:', response.data);
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.error('Erro ao enviar mensagem:', error.response ? error.response.data : error.message);
        }
        else {
            console.error('Erro desconhecido:', error);
        }
    }
});
exports.default = sendMessage;
