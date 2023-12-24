from selenium_utils.utils import *
from selenium_utils.test_base import *
import pytest

BASE_DIR = Path(__file__).resolve().parent

#setup: sudo -H pip3 install -r requirements.txt&sudo -H apt-get install -y chromium-browser
#run: python -m pytest -q --num_exercicio="0.2" test.py

@pytest.mark.usefixtures("open_chrome")
class TestExampleOne:
    def test_js0_exericio(self, num_exercicio):
        arquivo = "index.html"
        url = f"file://{BASE_DIR}/{arquivo}"
        open_new_page(url, self.chrome)

        exercicio_id = "statusTeste"+num_exercicio
        exercicio = self.chrome.find_element(By.ID, exercicio_id)
        arr_classes = exercicio.get_attribute('class').split()
        
        assert "nao_implementado" not in arr_classes, "Função não implementada. Certifique-se que colocou nome correto da função conforme especificado. "
        assert "erro_execucao" not in arr_classes, "Função não retornou o resultado esperado. Acesse o respectivo exercício na página web para verificar qual entrada/saída que no qual o programa não executou corretamnte. Verifique também se ocorreu algum erro de sintaxe."
        assert "ok" in arr_classes, "Ocorreu algum erro neste exercício. Acesse o respectivo exercício na página web para verificar qual entrada/saída que no qual o programa não executou corretamnte. Verifique também se ocorreu algum erro de sintaxe."
