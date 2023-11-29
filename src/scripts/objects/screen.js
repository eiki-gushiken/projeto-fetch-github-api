import { repository } from "./repositories.js"

const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML =
            `<div class="info">
                <img src="${user.avatarUrl}" alt="Foto do perfil de usuário">
                <div class="data">
                    <h1>${user.name ?? "Não possui nome cadastrado 😭"}</h1>
                    <p>${user.bio ?? "Não possui bio cadastrada 😭"}</p>
                    <br>
                    <h4><i class="fas fa-users"></i> ${user.followers} Seguidores </h4>
                    <h4><i class="fas fa-user"></i> ${user.following} Seguindo</h4>

                </div>
            </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => {
            repository.setRepositoryInfo(repo)
            repositoriesItens += `
            <li>
                <a href="${repository.url}" target="_blank">
                    <p>${repository.name}</p>
                    <ul class="repository-info">
                        <li>🍴${repository.forks}</li>
                        <li>⭐${repository.stars}</li>
                        <li>👀${repository.watchers}</li>
                        <li>🧑‍💻${repository.language ?? "--"}</li>
                    </ul>
                </a>
            </li>`
        })

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `
            <div class="repositories section">
                <h2>Repositórios</h2>
                <ul>${repositoriesItens}</ul>
            </div>`
        }

        let eventsItens = ''
        user.events.forEach(event => {
            if (event.type === "PushEvent") {
                eventsItens += `
                <li class="event-item">
                    <h3><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></h3>
                    <p>- ${event.payload.commits[0].message}</p>
                </li>`
            } else if (event.type === "CreateEvent") {
                eventsItens += `
                <li class="event-item">
                    <h3><a href="https://github.com/${event.repo.name}" target="_blank">${event.repo.name}</a></h3>
                </li>`
            }
        })

        if (eventsItens !== '') {
            this.userProfile.innerHTML += `
            <div class="events section">
                <h2>Eventos</h2>
                <ul class="event-list">${eventsItens}</ul>
            </div>`
        }
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado 😔</h3>"
    },

    showRequireField(){
        document.querySelector('.alert').classList.remove('hide')
    },

    unshowRequireField(){
        document.querySelector('.alert').classList.add('hide')
    }
}

export { screen }