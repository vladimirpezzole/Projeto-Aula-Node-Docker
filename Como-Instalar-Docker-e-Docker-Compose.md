# **Instalação do Docker e Docker Compose no Debian e derivados**

> > **Última atualização: 08 de agosto de 2023**

Este guia fornece instruções passo a passo para instalar o Docker e o Docker Compose no Debian e derivados.

## **Instalação do Docker no Debian**

Antes de tudo remova versões antigas do Docker (se existirem)executando e o seguinte comando para que quaisquer pacotes em conflito sejam desinstalados:

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done
```

1. Atualize o sistema operacional:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
```

2. Adicionar a Docker Engine oficial de chave GPG::

```bash
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
```

3. Use o seguinte comando para configurar o repositório:

```bash
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
```

4. Atualize o apt pacote de índice:

```bash
sudo apt-get update
```

5. Para instalar a versão mais recente, execute:

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

6. Verifique se o Docker foi instalado corretamente executando o comando:

```bash
sudo docker run hello-world
```

Você verá uma mensagem indicando que o Docker foi instalado corretamente se tudo estiver configurado corretamente.

7. Adicione o usuário ao grupo "docker":

```bash
sudo usermod -aG docker $USER
```

Em seguida, faça logout e faça login novamente para que as alterações tenham efeito.

Você pode verificar se as alterações foram aplicadas corretamente executando o seguinte comando:

```bash
groups
```

Ele exibirá uma lista dos grupos aos quais o usuário atual pertence, e você deverá ver o grupo "docker" listado lá.

_*Fonte: [Install Docker Engine on Debian](https://docs.docker.com/engine/install/debian/)_

---
**********************

## **Instalação do Docker Compose no Debian e Derivados**

Primeiro verifique se já possui alguma instalação executando o comando:

```bash
docker-compose --version
```

ou

```bash
docker compose version
```

<br>
Se não tiver o **Docker Compose** instalado siga os passos abaixo:

1. Certifique-se de ter o `curl` instalado no seu sistema. Caso não tenha, você pode instalá-lo executando o seguinte comando:

```bash
sudo apt update
sudo apt install curl
```

2. Baixe a versão mais recente do Docker Compose:

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

3. Dê permissão de execução ao binário do Docker Compose:

```bash
sudo chmod +x /usr/local/bin/docker-compose
```

Certifique-se de substituir `docker-compose` por `docker compose` se estiver usando o Docker Compose V2.

5. Verifique se a instalação foi bem-sucedida executando o comando:

```bash
docker-compose --version
```

ou

```bash
docker compose version
```

<br>

Você verá a versão mais recente do Docker Compose instalada sendo exibida.

Agora você tem o Docker e a versão mais atualizada do Docker Compose instalados no seu sistema Debian. Certifique-se de substituir "docker-compose" por "docker compose" ao executar comandos relacionados ao Docker Compose.

Lembre-se de que o método de gerenciamento de chave `apt-key` está obsoleto e foi substituído pelo novo método usando o diretório `trusted.gpg.d`. As instruções foram atualizadas para refletir essa alteração.
