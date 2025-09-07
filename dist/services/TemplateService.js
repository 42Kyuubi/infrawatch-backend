"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateService = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
class TemplateService {
    render(template, data) {
        const compiled = handlebars_1.default.compile(template.body);
        const body = compiled(data);
        const subject = template.subject
            ? handlebars_1.default.compile(template.subject)(data)
            : undefined;
        return { subject, body };
    }
}
exports.TemplateService = TemplateService;
//# sourceMappingURL=TemplateService.js.map