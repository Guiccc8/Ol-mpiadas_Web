document.addEventListener('DOMContentLoaded', function() {
    fetch('dados.json')
        .then(response => response.json())
        .then(data => {
            const edicoesContainer = document.querySelector('#edicoes .row');

            data.edicoes.forEach(edicao => {
                const card = document.createElement('div');
                card.classList.add('col-md-4');
                card.innerHTML = `
                    <div class="card mb-4">
                        <img src="${edicao.detalhes.imagem}" class="card-img-top" alt="${edicao.cidade}">
                        <div class="card-body">
                            <h5 class="card-title">${edicao.cidade} ${edicao.ano}</h5>
                            <p class="card-text">${edicao.descricao}</p>
                            <button class="btn btn-primary ver-mais-btn" 
                                    data-ano="${edicao.ano}" 
                                    data-cidade="${edicao.cidade}" 
                                    data-descricao="${edicao.descricao}" 
                                    data-datas="${edicao.detalhes.datas || 'Não disponível'}" 
                                    data-participantes='${JSON.stringify(edicao.detalhes.participantes) || '{}'}' 
                                    data-esportes="${edicao.detalhes.esportes.join(', ') || 'Não disponível'}" 
                                    data-principais_eventos="${edicao.detalhes.principais_eventos.join('<br>') || 'Não disponível'}" 
                                    data-podium='${JSON.stringify(edicao.detalhes.podium) || '{}'}' 
                                    data-contexto_geopolitico="${edicao.detalhes.contexto_geopolitico.descricao || 'Não disponível'}" 
                                    data-fatos_interessantes="${edicao.detalhes.fatos_interessantes.join('<br>') || 'Não disponível'}">
                                Ver Mais
                            </button>
                        </div>
                    </div>
                `;
                edicoesContainer.appendChild(card);
            });

            document.querySelectorAll('.ver-mais-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const ano = this.getAttribute('data-ano');
                    const cidade = this.getAttribute('data-cidade');
                    const descricao = this.getAttribute('data-descricao');
                    const datas = this.getAttribute('data-datas');
                    const participantes = JSON.parse(this.getAttribute('data-participantes'));
                    const esportes = this.getAttribute('data-esportes');
                    const principais_eventos = this.getAttribute('data-principais_eventos');
                    const podium = JSON.parse(this.getAttribute('data-podium'));
                    const contexto_geopolitico = this.getAttribute('data-contexto_geopolitico');
                    const fatos_interessantes = this.getAttribute('data-fatos_interessantes');

                    const modal = document.querySelector('#edicaoModal');
                    modal.querySelector('.modal-title').textContent = `Detalhes de ${cidade} ${ano}`;
                    modal.querySelector('.modal-body').innerHTML = `
                        <p><strong>Descrição:</strong> ${descricao}</p>
                        <p><strong>Datas:</strong> ${datas}</p>
                        <p><strong>Participantes:</strong> ${participantes.atletas || 'Não disponível'} atletas, ${participantes.eventos || 'Não disponível'} eventos</p>
                        <p><strong>Esportes:</strong> ${esportes}</p>
                        <p><strong>Principais Eventos:</strong><br>${principais_eventos}</p>
                        <p><strong>Podium:</strong><br>1º: ${podium.primeiro || 'Não disponível'}<br>2º: ${podium.segundo || 'Não disponível'}<br>3º: ${podium.terceiro || 'Não disponível'}</p>
                        <p><strong>Contexto Geopolítico:</strong> ${contexto_geopolitico}</p>
                        <p><strong>Fatos Interessantes:</strong><br>${fatos_interessantes}</p>
                    `;

                    // Abre o modal
                    $('#edicaoModal').modal('show');
                });
            });
        })
        .catch(error => {
            console.error('Erro ao carregar os dados:', error);
        });
});
