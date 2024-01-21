
    const configurations = {
        inicial: { forca: '', velocidade: '', exposicao: '', passadas: '', observacoes: ''  },
        acetato: { forca: '33', velocidade: '2', exposicao: '5', passadas: '2', observacoes: '' },
        eva_1mm_espessura: { forca: '33', velocidade: '2', exposicao: '10', passadas: '3', observacoes: 'Na Cameo 4, usar o corte kraft no carrinho 2.' },
        eva_com_glitter: { forca: '33', velocidade: '2', exposicao: '10', passadas: '3', observacoes: 'Na Cameo 4, usar o corte kraft no carrinho 2.' },
        lamicote: { forca: '25', velocidade: '2', exposicao: '5', passadas: '2', observacoes: 'Marcar o box de sobrecorte - aquele triângulo depois das passadas.' },
        papel_75g: { forca: '5 a 10', velocidade: '5', exposicao: '1', passadas: '1', observacoes: '' },
        papel_180g: { forca: '18 a 20', velocidade: '5', exposicao: '3', passadas: '1', observacoes: '' },
        papel_280g: { forca: '20 a 25', velocidade: '5', exposicao: '4', passadas: '1', observacoes: '' },
        papel_300g: { forca: '25 a 30', velocidade: '2', exposicao: '5', passadas: '2 ou +', observacoes: 'Marcar o box de sobrecorte - aquele triângulo depois das passadas'},
        papel_com_glitter_180g: { forca: '30', velocidade: '4', exposicao: '3 a 5', passadas: '2', observacoes: 'Ou tambem pode usar 2 passadas, com a forca 25 e exposição 3' },
        papel_adesivo_180g_meio_corte: { forca: '15', velocidade: '4', exposicao: '2', passadas: '1', observacoes: '' },
        papel_adesivo_135g_meio_corte: { forca: '2 a 5', velocidade: '6', exposicao: '1', passadas: '1', observacoes: 'Usar 5 de velocidade, caso haja muitos efeitos ou curvas' },
        planner: { forca: '33', velocidade: '1', exposicao: '10', passadas: '4' , observacoes: '' },
        quadro_incentivo: { forca: '33', velocidade: '1', exposicao: '10', passadas: '4' , observacoes: '' },
        vinil_meio_corte: { forca: '10', velocidade: '2', exposicao: '1', passadas: '1', observacoes: ''  },
        vinil_metalizado: { forca: '20', velocidade: '2', exposicao: '1', passadas: '1' , observacoes: '' }
    };
        
        const instructionSets = {
            inicial: [],
            vinil_meio_corte: [
                'Ajustar correta exposição da lâmina',
                'Colar vinil na base e colocar fita crepe caso a cola não esteja boa',
                'Ajustar os roletes até o sulco',
                'Ativar trava de segurança dos roletes',
                'Conferir se lâmina está limpa',
                'Conferir se a base de corte foi selecionada no programa',
                'Conferir se as imagens estão com os pontos simplificados',
                'Conferir se os nomes estão fundidos',
            ],
            
            planner: [
                'Ajustar correta exposição da lâmina',
                'Colar material na base e colocar fita crepe caso a cola não esteja boa',
                'Ajustar os roletes até o sulco',
                'Ativar trava de segurança dos roletes',
                'Conferir se lâmina está limpa',
                'Conferir se a base de corte foi selecionada no programa',
                'Conferir se a leitura das marcas de corte está na orientação correta (vertical ou horizontal conforme a arte)'
            ],
            quadro_incentivo: [
                'Ajustar correta exposição da lâmina',
                'Colar material na base e colocar fita crepe caso a cola não esteja boa',
                'Ajustar os roletes até o sulco',
                'Ativar trava de segurança dos roletes',
                'Conferir se lâmina está limpa',
                'Conferir se a base de corte foi selecionada no programa',
                'Conferir se a leitura das marcas de corte está na orientação correta (vertical ou horizontal conforme a arte)'
            ],
            demais: [
                'Ajustar correta exposição da lâmina',
                'Colar material na base e colocar fita crepe caso a cola não esteja boa',
                'Ajustar os roletes até o sulco',
                'Ativar trava de segurança dos roletes',
                'Conferir se lâmina está limpa',
                'Conferir se a base de corte foi selecionada no programa',
                'Conferir se a exposição foi corretamente selecionada no seu Bladekit',
                'Conferir se o corte selecionado (azul ou vermelho) está de acordo com o carrinho em que se encontra a lâmina'
            ],        
        };
function showCard(cardId) {
    $('.card').addClass('d-none'); // Esconde todos os cards
    $(`#${cardId}`).removeClass('d-none'); // Mostra o card específico
}

$(document).ready(function() {
    $('#material-select').on('change', function() {
        let material = this.value;
        if (material !== 'inicial') {
            let config = configurations[material];
            let instructions = instructionSets[material] || instructionSets['demais'];

            // Atualiza o card de configurações com as informações do material selecionado
            $('#configurations').html(`
                <p><strong>Força:</strong> ${config.forca || 'Não especificado'}</p>
                <p><strong>Velocidade:</strong> ${config.velocidade || 'Não especificado'}</p>
                <p><strong>Exposição:</strong> ${config.exposicao || 'Não especificado'}</p>
                <p><strong>Passadas:</strong> ${config.passadas || 'Não especificado'}</p>
                <p><strong>Observações:</strong> ${config.observacoes || 'Nenhuma'}</p>
            `);

            // Atualiza a seção de instruções
            let instructionHTML = '<ul>';
            instructions.forEach((instruction, index) => {
                instructionHTML += `<li><input type="checkbox" id="instruction-${index}" class="instruction-checkbox"> <label for="instruction-${index}">${instruction}</label></li>`;
            });
            instructionHTML += '</ul>';
            $('#instructions').html(instructionHTML);

            // Reset progress bar
            updateProgressBar(0);

            // Chama a função showCard para exibir o card de configurações
            showCard('card-config');
        }
    });

    // Listen for checkbox changes
    $(document).on('change', '.instruction-checkbox', function() {
        let checkboxes = $('.instruction-checkbox');
        let checked = checkboxes.filter(':checked');
        let progress = (checked.length / checkboxes.length) * 100;
        updateProgressBar(progress);
    });

    $('#prosseguir').on('click', function() {
        let currentCard = $('.card:not(.d-none)');
        let nextCardId = '';
    
        if (currentCard.attr('id') === 'card-material') {
            nextCardId = 'card-config';
        } else if (currentCard.attr('id') === 'card-config') {
            nextCardId = 'card-checklist';
        }
    
        if (nextCardId) {
            showCard(nextCardId);
        }
    });

$('#voltar').on('click', function() {
    let currentCard = $('.card:not(.d-none)');
    let previousCardId = '';

    if (currentCard.attr('id') === 'card-checklist') {
        previousCardId = 'card-config';
    } else if (currentCard.attr('id') === 'card-config') {
        previousCardId = 'card-material';
    }

    if (previousCardId) {
        showCard(previousCardId);
    }
});
