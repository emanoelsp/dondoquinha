import { Clock, HelpCircle, Mail, MessageCircle, Phone, ShoppingCart, Building, MapPin, Lightbulb, AlertTriangle, ThumbsUp } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="mt-36 w-full bg-white py-8 text-pink-700">
            <div className="container mx-auto px-4">
                <h2 className="mb-8 text-left text-3xl font-bold text-pink-500"> Contatos </h2>
                
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    
                    {/* Primeira Linha - Informação da Empresa & Horário de Funcionamento */}
                    <div className="border-t-4 border-pink-300 bg-pink-50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 text-pink-700">
                            <Building className="mr-2" />
                            Informações da Empresa
                        </div>
                        <div className="grid gap-2">
                            <p><strong>CNPJ:</strong> 12.345.678/0001-90</p>
                            <p><strong>Nome da Empresa:</strong> Acme Corporation</p>
                            <div className="flex items-start">
                                <MapPin className="mr-2 mt-1 flex-shrink-0" />
                                <p><strong>Endereço:</strong> Rua Principal, 123, Sala 456, Cidade, Estado 12345, País</p>
                            </div>
                        </div>
                    </div>

                    <div className="border-t-4 border-pink-300 bg-pink-50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 text-pink-700">
                            <Clock className="mr-2" />
                            Horário de Funcionamento
                        </div>
                        <p className="mb-2">Segunda - Sexta: 9h - 18h</p>
                        <p className="mb-4">Sábado: 10h - 16h</p>
                        <div className="flex items-center">
                            <ShoppingCart className="mr-2" />
                            <p>Compras online disponíveis 24/7</p>
                        </div>
                    </div>

                         {/* Terceira Linha - Informações de Contato */}
                         <div className="border-t-4 border-pink-300 bg-pink-50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 text-pink-700">
                            <Mail className="mr-2 text-pink-600" />
                            Informações de Contato
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                            <div className="flex items-center">
                                <Mail className="mr-2 text-pink-600" />
                                <a href="mailto:info@example.com" className="hover:text-pink-500 hover:underline">
                                    info@example.com
                                </a>
                            </div>
                            <div className="flex items-center">
                                <Phone className="mr-2 text-pink-600" />
                                <a href="tel:+1234567890" className="hover:text-pink-500 hover:underline">
                                    +1 (234) 567-890
                                </a>
                            </div>
                            <div className="flex items-center">
                                <MessageCircle className="mr-2 text-pink-600" />
                                <span>Chat ao Vivo (24/7)</span>
                            </div>
                        </div>
                    </div>

                    {/* Segunda Linha - Perguntas Frequentes, Suporte, Sugestões */}
                    <div className="border-t-4 border-pink-300 bg-pink-50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 text-pink-700">
                            <HelpCircle className="mr-2" />
                            Perguntas Frequentes
                        </div>
                        <div className="space-y-2">
                            <div>
                                <h2 className="font-semibold">Como posso rastrear meu pedido?</h2>
                                <span className="text-sm">Acesse Histórico de Pedidos após fazer login.</span>
                            </div>
                            <div>
                                <h2 className="font-semibold">Qual é a política de devolução?</h2>
                                <span className="text-sm">Política de devolução de 30 dias para a maioria dos itens. Confira nossa página de Devoluções.</span>
                            </div>
                            <div>
                                <h2 className="font-semibold">Vocês fazem entregas internacionais?</h2>
                                <span className="text-sm">Sim, enviamos para o mundo todo. Custos e prazos variam por localização.</span>
                            </div>
                        </div>
                    </div>

                    <div className="border-t-4 border-pink-300 bg-pink-50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 text-pink-700">
                            <MessageCircle className="mr-2" />
                            Ajuda & Suporte
                        </div>
                        <p className="mb-4">Precisa de ajuda? Nossa equipe está aqui para apoiar você!</p>
                        <button className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                            Fale com o Suporte
                        </button>
                    </div>

                    <div className="border-t-4 border-pink-300 bg-pink-50 p-4 rounded-lg shadow-md">
                        <div className="flex items-center mb-4 text-pink-700">
                            <Lightbulb className="mr-2" />
                            Área de Sugestões
                        </div>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <ThumbsUp className="mr-2 text-pink-600" />
                                <span>Sugestões de Melhoria</span>
                            </li>
                            <li className="flex items-center">
                                <AlertTriangle className="mr-2 text-pink-600" />
                                <span>Relato de Problemas</span>
                            </li>
                            <li className="flex items-center">
                                <MessageCircle className="mr-2 text-pink-600" />
                                <span>Sugestões de Uso</span>
                            </li>
                        </ul>
                        <button className="mt-4 w-full border border-pink-600 text-pink-600 py-2 rounded-lg hover:bg-pink-100">
                            Enviar Feedback
                        </button>
                    </div>

               
                </div>
            </div>
        </section>
    );
}
