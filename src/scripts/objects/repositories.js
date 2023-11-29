const repository = {
    name: '',
    url: '',
    forks: '',
    stars: '',
    watchers: '',
    language: '',

    setRepositoryInfo(repository){
        this.name = repository.name
        this.url = repository.html_url
        this.forks = repository.forks_count
        this.stars = repository.stargazers_count
        this.watchers = repository.watchers_count
        this.language = repository.language
    }
}

export { repository }